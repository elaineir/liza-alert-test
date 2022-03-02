import { apiURL, itemURL, newsURL } from '../config/config';
import { IComment, INewsDetail } from '../models';

interface ResponseError {
  error: string;
}

/** Делает проверку ответа сервера, возвращает или объект запроса, или текст ошибки */
async function checkServerResponse<T>(res: Response): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.ok
    ? res.json()
    : res.json().then((err: ResponseError) => Promise.reject<string>(err.error));
}

/** Возвращает массив айдишников новостей, на вход принимает число - сколько загрузить новостей */
async function getNewsIds(limit: number): Promise<number[]> {
  const url = `${apiURL + newsURL}?orderBy="$key"&limitToFirst=${limit}`;
  const res = await fetch(url);
  return checkServerResponse<number[]>(res);
}

/** Возвращает объект комментария */
async function getCommentById(id: number): Promise<IComment> {
  const url = `${apiURL + itemURL + id.toString()}.json`;
  const res = await fetch(url);
  return checkServerResponse<IComment>(res);
}

/** Возвращает объект новости */
export async function getNewsDetailById(id: number): Promise<INewsDetail> {
  const url = `${apiURL + itemURL + id.toString()}.json`;
  const res = await fetch(url);
  return checkServerResponse<INewsDetail>(res);
}

/** Возвращает массив объектов новостей */
export async function getNews(limit: number): Promise<INewsDetail[]> {
  const newsIds: number[] = await getNewsIds(limit);
  return Promise.all(newsIds.map(async (id) => getNewsDetailById(id)));
}

/** Возвращает массив комментариев с вложенными объектами комментариев (рекурсивное построение) */
export async function getComments(commentIds: number[]): Promise<IComment[]> {
  async function getAllNestedComments(nestedCommentIds: number[]): Promise<IComment[]> {
    return Promise.all(
      nestedCommentIds.map(async (commentId) => {
        const comment: IComment = await getCommentById(commentId);
        if (comment?.kids?.length) {
          const kids: IComment[] = await getAllNestedComments(comment.kids as number[]);
          if (kids?.length) {
            comment.kids = kids;
          }
        }

        return comment;
      })
    );
  }

  return getAllNestedComments(commentIds);
}
