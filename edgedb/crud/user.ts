import { client } from "../client"
import e from "../dbschema/edgeql-js"

export interface User {
  name?: string
  email: string
}

export async function addUser(user: User) {
  const res = await e
    .insert(e.User, {
      email: user.email,
    })
    .run(client)
  console.log(res, "user added")
  return res?.id
}

export async function deleteUser(id: string) {
  const res = await e
    .delete(e.User, (user) => ({
      filter: e.op(user.id, "=", id),
    }))
    .run(client)
  console.log(res)
  return res
}

export async function getUsers() {
  const res = await e
    .select(e.User, () => ({
      name: true,
      email: true,
      id: true,
    }))
    .run(client)
  console.log(res)
  return res
}

export async function getUserIdByName(name: string) {
  const res = await e
    .select(e.User, (user) => ({
      id: true,
      filter: e.op(user.name, "ilike", name),
    }))
    .run(client)
  if (res.length === 0) {
    return undefined
  } else {
    return res[0].id
  }
}

export async function updateLearningStatusForGlobalTopic(
  email: string,
  topicName: string,
  learningStatus: "learning" | "learned" | "to learn",
) {
  if (learningStatus === "learning") {
    const res = await e.update(e.User, (user) => {
      return {
        filter_single: { email },
        set: {
          topicsLearning: {
            "+=": e.select(e.GlobalTopic, (gt) => {
              return {
                filter_single: { name: topicName },
              }
            }),
          },
        },
      }
    })
    return res.run(client)
  }
}
