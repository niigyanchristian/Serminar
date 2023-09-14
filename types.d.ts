type myQuestion = {
    [x: string]: Key | null | undefined,
    author:string,
    email:string,
    number:string,
    title:string,
    message:string,
    createdAt:object
}

type myReply = {
    [x: string]: Key | null | undefined,
    message:string,
    questionId:string,
    createdAt:object
}