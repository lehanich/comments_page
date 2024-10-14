import React, {useEffect, useCallback, useState} from "react";
import clsx from "clsx";
import { Comments } from "@app/models/Comments";
import Comment from "@components/Comment/Comment";
import styles from "./comments.module.scss";

export type CommentsProps = {
  readonly data?: Comments;
  readonly level?: number;
  readonly className?: string;
  readonly logout?: boolean;
  readonly path: string;
  // children: any; // !!!
};


const Comments: React.FC<CommentsProps> = ({
  className,
  level = 0,
  path,
  data,

}) => {
  

  return <>
    {Boolean(data) && Object.keys(data).map((key: any, index: number) => (
      <div key={index} className={clsx(styles.comment, styles[`level${level}`], className)}>

        <Comment data={data[key]} path={`${path}/${key}`} level={level} className={styles[`level${level}`]}/>

        {Boolean(data[key].comments) && <>
          <Comments
            data={data[key].comments}
            level={level+1}
            path={`${path}/${key}/comments`}
            />
        </>}

      </div>
    ))}
  </>
}
export default Comments;
