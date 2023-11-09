/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase, ref, update } from "firebase/database";
import firebaseApp from "~/firebase";

const database = getDatabase(firebaseApp);

const CompleteTODO = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body);
    // res.status(200).json({});
    // res.status(200).json({});
    // res.status(200).json({});
    // return;

    let {
      taskName: taskName,
      completed: completed,
      deadline: deadline,
      userId: userId,
      id: id,
    } = req.body;

    userId = (userId as string).split("|")[1];

    // console.log(taskName, completed, deadline, userId);

    void update(ref(database, "todo_list/" + userId + "/" + id), {
      completed: true,
    });

    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const FetchData = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // res.status(200).json({ msg: "Posted", value: values });
  } catch (err) {
    // console.log(err);
    // res.status(500).json({ error: err });
  }
};

export default CompleteTODO;
