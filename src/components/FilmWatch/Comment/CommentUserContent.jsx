import { useAutoAnimate } from "@formkit/auto-animate/react";
import { doc, updateDoc } from "firebase/firestore";
import { Fragment, useRef, useState } from "react";
import { AiFillHeart, AiTwotoneLike } from "react-icons/ai";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { FaAngry, FaSadTear, FaSurprise } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { reactionColorForTailwindCSS } from "../../../shared/constants";
import { db } from "../../../shared/firebase";
import { calculateTimePassed } from "../../../shared/utils";
import { useAppSelector } from "../../../store/hooks";
import EditComment from "./EditComment";
import ReactionInfo from "./ReactionInfo";
import Reply from "./Reply";
import ReplyBox from "./ReplyBox";

const CommentUserContent = ({ commentData, sortType, commentLimit, media_type, id, role }) => {
  const [parent] = useAutoAnimate();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [commentHiden, setCommentHiden] = useState([]);
  const [showOptionFor, setShowOptionFor] = useState(undefined);
  const [editingCommentFor, setEditingCommentFor] = useState();
  const editValueRef = useRef(null);
  const [isReplyingFor, setIsReplyingFor] = useState();

  const sortComment = (commentData, type) => {
    if (!commentData) return undefined;

    if (type === "popular")
      return commentData.docs
        .slice()
        .sort((a, b) => Object.values(b.data()?.reactions).length - Object.values(a.data()?.reactions).length);

    if (type === "latest") return commentData.docs;
  };

  const addReaction = (commentId, value) => {
    if (!currentUser) return;

    updateDoc(doc(db, `${media_type}-${id}`, commentId), {
      [`reactions.${currentUser.uid}`]: value,
    });
  };

  const determineReactionText = (reactions) => {
    // if (!Object.keys(reactions).includes((currentUser as User).uid)) {
    //   return "Reaction";
    // }

    const userReactionValue = Object.entries(reactions).find((entry) => entry[0] === currentUser.uid)?.[1];

    if (!userReactionValue)
      return {
        ableToCancelReaction: false,
        value: "Reaction",
        color: "text-inherit",
      };

    return {
      ableToCancelReaction: true,
      value: userReactionValue[0].toUpperCase() + userReactionValue.slice(1),
      color: reactionColorForTailwindCSS[userReactionValue],
    };
  };

  const removeReaction = (docData, commentId) => {
    const filteredReactionUsers = Object.entries(docData.reactions).filter((entry) => entry[0] !== currentUser?.uid);

    const updatedReactionUserObj = filteredReactionUsers.reduce(
      (acc, current) => ({
        ...acc,
        [current[0]]: current[1],
      }),
      {}
    );

    updateDoc(doc(db, `${media_type}-${id}`, commentId), {
      reactions: updatedReactionUserObj,
    });
  };

  const handleEditComment = (commentId) => {
    const editText = editValueRef.current.value;

    if (!editText.trim()) return;

    updateDoc(doc(db, `${media_type}-${id}`, commentId), {
      value: editText,
      isEdited: true,
    });

    setEditingCommentFor(undefined);
  };

  return (
    <ul
      // @ts-ignore
      ref={parent}
    >
      {sortComment(commentData, sortType)
        ?.slice(0, commentLimit)
        .map((doc) => {
          const docData = doc.data();

          return (
            <Fragment key={doc.id}>
              {!commentHiden.includes(doc.id) && (
                <li key={doc.id} className="mb-6 flex md:gap-4 gap-2 items-start last:mb-0">
                  <div className="w-[44px] h-[44px] shrink-0">
                    <LazyLoadImage
                      src={docData.user.photoURL}
                      alt=""
                      effect="opacity"
                      className="w-11 h-11 rounded-full object-cover "
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className={`peer ${editingCommentFor === doc.id && "flex-1"}`}>
                    <div
                      className={`relative bg-dark-lighten px-4 py-2 rounded-2xl ${
                        editingCommentFor === doc.id ? "block" : "inline-block"
                      }`}
                    >
                      <ReactionInfo docData={docData} />

                      {/* <div className="flex justify-between items-center"> */}
                      {/* <div className="flex gap-4 items-center"> */}
                      <p className="text-white font-medium">{docData.user.displayName}</p>
                      {/* </div> */}
                      {/* </div> */}
                      {editingCommentFor !== doc.id ? (
                        <p style={{ wordWrap: "break-word" }} className="text-lg mt-1 max-w-[63vw] md:max-w-none">
                          {docData.value}
                        </p>
                      ) : (
                        <>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleEditComment(doc.id);
                            }}
                            className="flex gap-2 items-center"
                          >
                            <input
                              onKeyDown={(e) => {
                                if (e.key === "Escape") setEditingCommentFor(undefined);
                              }}
                              ref={editValueRef}
                              defaultValue={docData.value}
                              type="text"
                              className="w-full bg-dark-lighten-2 outline-none py-1 px-2 rounded-md mt-1 text-lg text-white"
                              autoFocus
                            />
                            <button>
                              <MdSend size={25} className="text-primary" />
                            </button>
                          </form>
                          <p className="mt-1 text-sm">Press Esc to cancel</p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-3 mt-3 items-center">
                      {currentUser && (
                        <div className="relative group">
                          <button
                            {...(determineReactionText(docData.reactions).ableToCancelReaction && {
                              onClick: () => removeReaction(docData, doc.id),
                            })}
                            className={`${determineReactionText(docData.reactions).color}`}
                          >
                            {determineReactionText(docData.reactions).value}
                          </button>

                          <div className="group-hover:opacity-100 group-hover:visible opacity-0 invisible bg-dark-lighten-2 transition duration-300 shadow-md px-2 py-2 rounded-full absolute -top-8 -right-[105px] flex gap-2 z-40">
                            <button onClick={() => addReaction(doc.id, "like")}>
                              <AiTwotoneLike
                                className="text-blue-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, "love")}>
                              <AiFillHeart className="text-red-500 hover:scale-125 transition duration-300" size={20} />
                            </button>
                            <button onClick={() => addReaction(doc.id, "haha")}>
                              <BsEmojiLaughingFill
                                className="text-yellow-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, "wow")}>
                              <FaSurprise
                                className="text-green-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, "sad")}>
                              <FaSadTear
                                className="text-purple-500 hover:scale-125 transition duration-300"
                                size={20}
                              />
                            </button>
                            <button onClick={() => addReaction(doc.id, "angry")}>
                              <FaAngry className="text-orange-500 hover:scale-125 transition duration-300" size={20} />
                            </button>
                          </div>
                        </div>
                      )}
                      {role !== "reply" && (
                        <button
                          onClick={() => {
                            if (!currentUser) return;
                            if (isReplyingFor !== doc.id) setIsReplyingFor(doc.id);
                            else setIsReplyingFor(undefined);
                          }}
                          className="hover:text-white transition duration-300"
                        >
                          Reply
                        </button>
                      )}
                      <p className="text-sm">{calculateTimePassed(docData.createdAt?.seconds * 1000 || 0)}</p>
                      {docData.isEdited && <p className="text-sm">Edited</p>}
                    </div>
                    {isReplyingFor === doc.id && <ReplyBox commendId={doc.id} />}
                    <Reply commendId={doc.id} />
                  </div>

                  <EditComment
                    setEditingCommentFor={setEditingCommentFor}
                    media_type={media_type}
                    id={id}
                    singleDoc={doc}
                    showOptionFor={showOptionFor}
                    setShowOptionFor={setShowOptionFor}
                    setCommentHiden={setCommentHiden}
                  />
                </li>
              )}
            </Fragment>
          );
        })}
    </ul>
  );
};

export default CommentUserContent;