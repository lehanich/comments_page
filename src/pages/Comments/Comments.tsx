import React, {useEffect, useCallback, useState} from "react";
import styles from "./comments.module.scss";
import AddComment from "@components/AddComment/AddComment";
import { Page } from "@prebuild/components/Page/Page";
import { FireBaseApp } from "@app/api/firebase";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { Typography } from "@prebuild/components/Typography/Typography";
import Comments  from "@components/Comments/Comments";

export type RegisterProps = {
  readonly className?: string;
  readonly logout?: boolean;
  // children: any; // !!!
};

const image = require("@prebuild/assets/imgs/page-image.jpg");

const Register: React.FC<RegisterProps> = ({
  className,
  logout,
}) => {
  const [list, setList] = useState<Comments>();

  useEffect(() => {
    const f = new FireBaseApp();
    const db = getDatabase();
    const starCountRef = ref(db, 'comments');

    onValue(starCountRef, (snapshot: any) => {
      const data = snapshot.val();

      setList(data)
      console.log(data);
    });
  }, []);

  return (<>
      <Page
        header="A small selection of "
        subHeader="recent projects"
        image={image}
      >
        <div className={styles.root__content}>

          <Typography
            tag="p"
            color="text-primary"
            preset="paragraph1"
            className={styles.root__text}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ligula quis lacus fermentum, vitae vulputate sem tristique. Nunc justo orci, porta in luctus eget, ultrices vitae justo. Mauris dignissim laoreet mi, a commodo libero volutpat non. Maecenas aliquam sed leo eu blandit. Nam vehicula rhoncus libero ut porttitor. Proin urna tortor, bibendum at faucibus auctor, cursus sit amet odio. In hac habitasse platea dictumst. Proin ac tortor vel tortor auctor pellentesque eget nec nisl. Phasellus pulvinar varius tortor sed sagittis. Etiam aliquam consectetur purus fringilla varius. Maecenas nec dolor dolor. Cras faucibus malesuada luctus. Nam auctor vel tortor eget congue. Fusce porta imperdiet ante scelerisque ullamcorper. Pellentesque luctus ullamcorper lectus faucibus fringilla. Aenean tristique efficitur iaculis. Aliquam eu egestas mi, quis tristique justo. Donec eu ante at tellus eleifend pellentesque. Curabitur fermentum lectus eu erat porta, id sagittis sem aliquet. Integer aliquet vehicula lectus, nec finibus nibh tincidunt eu. Vestibulum quis dui nisi. In a pharetra enim, id blandit quam. Sed lobortis ligula enim, egestas aliquam purus facilisis et. Phasellus vitae leo a ligula commodo ultrices sed non elit.
          </Typography>

          <div className={styles.root__comments}>
            <AddComment
              path="comments"
            /> 

            <Comments
              data={list}
              level={0}
              path="comments"
            />
          </div>
        </div>
      </Page>
      
    </>
  );
}

export default Register;
