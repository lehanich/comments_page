import React, {useEffect, useCallback, useState} from "react";
import clsx from "clsx";
import { Comment } from "@app/models/Comments";
import Avatar from "@prebuild/components/Avatar/Avatar";
import { Box } from "@prebuild/components/Box/Box";
import Icon from "@components/Icon/Icon";
import {dateFormat3} from "@core/helpers/date";
import {useAuthValue} from "@src/AuthContext";
import AddComment from "@components/AddComment/AddComment";
import { app } from "@app/api/firebase2";
import { getDatabase, ref, child, push, update } from "firebase/database";

import styles from "./comment.module.scss";
import Button from "@src/prebuild/components/Forms/Button/Button";


export type CommentProps = {
  readonly className?: string;
  readonly data: Comment;
  readonly path?: string;
  readonly level?: number;
  // children: any; // !!!
};


const Comment: React.FC<CommentProps> = ({
  className,
  data,
  path,
  level
  // children
}) => {
  const [likesCount, setLikes] = useState(0);
  const [myLike, setMyLike] = useState(false);
  const [commentsCount, setCommentscount] = useState(0);
  const {currentUser} = useAuthValue()
  const [showInputField, setShowInputField] = useState(false);
  // const [newData, setNewData] = useState(data);

  useEffect(() => {
    // console.log("user!!!", currentUser);
    if (data.comments) {
      setCommentscount(Object.keys(data.comments).length);
    }

    setLikes(data.likes ? data.likes.length : 0);

    const el = data.likes ? data.likes.find((el) => el == currentUser.uid) : undefined;
    setMyLike(el ? true : false)
  }, []);

  const handleLike = useCallback(() => {
    // setLikes(likesCount + 1);

    const db = getDatabase(app);
    const updates: any = {};
    const el = Boolean(data.likes) ? data.likes.find((el) => el == currentUser.uid) : undefined;

    console.log(`${path}/likes`);

    if (!el) {
      updates[`${path}/likes`] = [currentUser.uid,...(data.likes || [])];
      setLikes(likesCount + 1);
      setMyLike(true);
    } else {
      updates[`${path}/likes`] = data.likes.filter((id: string) => id!== currentUser.uid);
      setLikes(likesCount - 1);
      setMyLike(false);
    }

    return update(ref(db), updates);
  }, [likesCount]);

  const handleShowInput = () => {
    setShowInputField(true)
  }

  const handleEndInput = () => {
    setShowInputField(false);
  }

  return <>
  <div className={clsx(styles.root, className)}>
    <Avatar
      // content="img"
      size="lg"
      text={data.author}
    />

    <Box className={clsx(styles.root__content)}>
      <div className={clsx(styles.root__header)}>
        <span>
          {data.author}
        </span>
          {Boolean(data.date) && dateFormat3(new Date(data.date))}
      </div>
      <div className={clsx(styles.root__text)}>
        {data.text}
      </div>
      <div className={clsx(styles.root__controls)}>
        <div className={clsx(styles.root__controls_item, myLike && styles.like_active)}>
          <Button
            text={<Icon icon="like"/>}
            onClick={() => handleLike()}
          >
          </Button>
          <span className={clsx(styles.root__controls_item_text)}>
            {likesCount}
          </span>
        </div>

        {level < 2 &&
          <div className={clsx(styles.root__controls_item)}>
            <Button
              text={<Icon icon="messages"/>}
              onClick={() => handleShowInput()}>
            </Button>
            <span className={clsx(styles.root__controls_item_text)}>
              {commentsCount}
            </span>

          </div>
        }


      </div>
    </Box>
  </div>

  {showInputField && <div>
    <AddComment
      className={className}
      path={path + "/comments"}
      type="answer"
      onSubmit={handleEndInput}
    />
  </div>}

  </>
}

export default Comment;
