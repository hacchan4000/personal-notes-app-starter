import { data } from "react-router-dom"
import { Request } from "./networks"


async function Login({email, pass}) {
  return await Request('login', {body:{email,password:pass}})
}
async function Register({name, email, pass}) {
  const result = await Request('register', { body:{name, email, password:pass} })
  return result
}



async function getUserLogged() {
  return await Request('users/me', {
    method: 'GET',
    token: true,
  })
}

async function addNote({title, body}) {
  const result = await Request('notes', { body:{title,body}, token:true })

  return { error: result.error, data: result.data }
}
async function archiveNote(id) {
  const result = await Request(`notes/${id}/archive`, { method:"POST", token:true})
  return { error: result.error, data: result.data }
}
async function deleteNote(id) {
  const result = await Request(`notes/${id}`, {method:'DELETE', token:true})
  return { error: result.error, data: result.data }
}

async function getNote(id) {
  const result = await Request(`notes/${id}`, {method:"GET",token:true})

  return { error: result.error, data: result.data }
}
async function getActiveNote() {
  const result = await Request(`notes`, {method:"GET",token:true})

  return { error: result.error, data: result.data }
}
async function getArchivedNote() {
  const result = await Request(`notes/archived`, {
    method: "GET",
    token: true,
  })
  return result
}
async function unArchiveNote(id) {
  const result = await Request(`notes/${id}/unarchive`, {method:"POST",token:true})

  return { error: result.error, data: result.data }
}

export {
  Login,Register,
  getUserLogged,
  addNote,archiveNote,unArchiveNote,deleteNote,
  getNote,getActiveNote,getArchivedNote,
}

