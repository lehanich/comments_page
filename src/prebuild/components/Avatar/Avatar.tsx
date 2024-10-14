
import React, { useCallback } from "react";
import clsx from "clsx";
import styles from "./avatar.module.scss";
import BaseLogo from "../../../prebuild/assets/imgs/userIcon.jpg";


interface AvatarProps {
  readonly className?: string;
  readonly color?: "primary" | "secondary" | "danger" | "success" | "transparent" | "info" | "warning";
  readonly size?: "sm" | "md" | "lg" | "xl" | "xxl";
  readonly shape?: "circle" | "square";
  readonly content?: "text" | "img" | "jsx";
  readonly avatar?: any;
  readonly text?: string;
  readonly jsx?: any;
  readonly children?: any;
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  color,
  size = "sm",
  shape = "circle",
  content = "text",
  avatar,
  text,
  jsx,
  children
}) => {

  if (avatar == null) {
    avatar = BaseLogo;
  } else {
    avatar = window.location.origin  + avatar;
  }
  const style: { [key: string]: React.CSSProperties } = {
    avatar: {
      // process.env.PUBLIC_URL
      // backgroundImage: `url('${window.location.origin}/images/userIcon.jpg')`,
      backgroundImage: content === "img" && `url('${avatar}')`,
    }
  };

  const getLogoText = useCallback((text: string) => {
    if (text == null) {
      return "";
    }
    const arr = text.split(" ");

    if (arr[1] == null) {
      return arr[0].charAt(0);
    }
    return arr[0].charAt(0) + arr[1].charAt(0);
  }, [text]);

  const TextContent = (
    <span className="">
      {content == "text"
        ? getLogoText(text)
        : content == "jsx" ? jsx : <></>
      }
    </span>
  )

  return <>
    {size === "xxl" &&
      <div className={clsx(className, styles[color], styles[shape])}>
        {Boolean(TextContent)
          ? TextContent
          : <img
            src={'https://solvery.io/'+avatar}
            alt="avatar"
            width="95%"
            height="auto"/>
        }
      </div>
    }
    {size !== "xxl" &&
      <span
        className={clsx(styles.root, styles[color], styles[content], styles[size], styles[shape], className)}
        style={style.avatar}
      >
        {Boolean(TextContent) && TextContent}
      </span>
    }
  </>
};

export default Avatar;
