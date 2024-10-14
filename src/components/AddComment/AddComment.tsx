import React, {useEffect, useCallback, useState} from "react";
import clsx from "clsx";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import {app, auth } from "@app/api/firebase2";
import { Box } from "@prebuild/components/Box/Box";
import BaseInput from "@prebuild/components/Forms/BaseInput/BaseInput";
import Button from "@prebuild/components/Forms/Button/Button";
import { Comment } from "@app/models/Comments";

import styles from "./addComment.module.scss";

export type AddCommentProps = {
  readonly className?: string;
  readonly path: string
  readonly logout?: boolean;
  readonly type?: "comment" | "answer";
  readonly onSubmit?: () => void;
  // children: any; // !!!
};


const AddComment: React.FC<AddCommentProps> = ({
  className,
  path,
  logout,
  type = "comment",
  onSubmit,
  // children
}) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    const db = getDatabase(app);
    const postListRef = ref(db, path);
    const newPostRef = push(postListRef);
    const newPost: Comment = {
      date: Date.now(),
      text: text,
      author: auth.currentUser.displayName,
      likes: []
      // avatar: "https://example.com/avatar.jpg"
    }

    set(newPostRef, newPost);
    setText("");
  }


  const handleChange = (e: any) => {
    setText(e.target.value)
  }

  const onEnterPress = (e: any) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSend();
      Boolean(onSubmit) && onSubmit();
    }
  }

  return <Box className={clsx(styles.root, type == "answer" && styles.answer,className)}>
    <BaseInput
     type="text"
      className={clsx(styles.root__input)}
      value={text}
      placeholder="Input message..."
      onChange={(e: any) => {
        handleChange(e);
      }}
      onKeyDown={(e:any) => onEnterPress(e)}
    />

      {type == "comment" && 
        <Button
          className={clsx(styles.root__button)}
          text="post"
          onClick={() => handleSend()}
        />
      }
  </Box>
}

export default AddComment;
