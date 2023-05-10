import pPipe from 'p-pipe';
import unfetch from 'isomorphic-unfetch';

export type Response_ = {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
};

export class ResponseError extends Error {
  public statusCode: number;

  public constructor(_status: number, statusText: string, body = '') {
    super(`${statusText} ${body}`.trim());
    this.name = 'ResponseError';
    this.statusCode = _status;
  }
}

export const toJSON = async (response: Response_): Promise<unknown> => {
  if (!response.ok) {
    const body = await response.text();
    throw new ResponseError(response.status, response.statusText, body);
  }

  try {
    return await response.json();
  } catch (err) {
    throw new ResponseError(response.status, response.statusText);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _fetch = async (baseUrl: string): Promise<Record<string, any>> => {
  return pPipe(toJSON)(
    await unfetch(baseUrl, {
      headers: {
        // Authorization: authorization,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
  );
};