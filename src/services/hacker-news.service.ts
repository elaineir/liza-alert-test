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
  try {
    const res = await fetch(url);
    return await checkServerResponse<number[]>(res);
  } catch (err) {
    return await checkServerResponse(err as Response);
  }
}

/** Возвращает объект комментария */
async function getCommentById(id: number): Promise<IComment> {
  const url = `${apiURL + itemURL + id.toString()}.json`;
  try {
    const res = await fetch(url);
    return await checkServerResponse<IComment>(res);
  } catch (err) {
    return await checkServerResponse(err as Response);
  }
}

/** Возвращает объект новости */
export async function getNewsDetailById(id: number): Promise<INewsDetail> {
  const url = `${apiURL + itemURL + id.toString()}.json`;
  try {
    const res = await fetch(url);
    return await checkServerResponse<INewsDetail>(res);
  } catch (err) {
    return await checkServerResponse(err as Response);
  }
}

/** Возвращает массив объектов новостей */
export async function getNews(limit: number): Promise<INewsDetail[]> {
  try {
    const newsIds: number[] = await getNewsIds(limit);
    return await Promise.all(newsIds.map(async (id) => getNewsDetailById(id)));
  } catch (err) {
    return await checkServerResponse(err as Response);
  }
}

/** Возвращает массив комментариев с вложенными объектами комментариев (рекурсивное построение) */
export async function getComments(commentIds: number[]): Promise<IComment[]> {
  // TODO оптимизировать
  function sortCommentsByTime(comments: IComment[]) {
    return comments.sort((a, b) => {
      if (a.time < b.time) return -1;
      if (a.time > b.time) return 1;
      return 0;
    });
  }

  async function getAllNestedComments(nestedCommentIds: number[]): Promise<IComment[]> {
    try {
      const comments = await Promise.all(
        nestedCommentIds.map(async (commentId) => {
          const comment: IComment = await getCommentById(commentId);
          if (comment?.kids?.length) {
            const kids: IComment[] = await getAllNestedComments(comment.kids as number[]);
            if (kids?.length) {
              comment.kids = sortCommentsByTime(kids);
            }
          }

          return comment;
        })
      );

      return sortCommentsByTime(comments);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return getAllNestedComments(commentIds);
}
