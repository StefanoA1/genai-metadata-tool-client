import pPipe from 'p-pipe';
import unfetch from 'isomorphic-unfetch';

export type Response_ = {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
};

export type ResponseType = {
  title: string;
  language: string;
  summary: string;
  teaser: string;
  detailed_summary: string;
  key_phrases: string[];
  acquired_skills: string[];
  prerequisites: string[];
  glossary: [
    {
      name: string;
      def: string;
    }
  ];
  followups: string;
  assessement: string;
  thumbnail: string;
  faq: string;
  keywords: string[];
  fun_facts: string;
  knowledge_level: string;
};

export class ResponseError extends Error {
  public statusCode: number;

  public constructor(_status: number, statusText: string, body = '') {
    super(`${statusText} ${body}`.trim());
    this.name = 'ResponseError';
    this.statusCode = _status;
  }
}

export const toJSON = async (response: Response_): Promise<ResponseType> => {
  if (!response.ok) {
    const body = await response.text();
    throw new ResponseError(response.status, response.statusText, body);
  }

  try {
    return (await response.json()) as unknown as ResponseType;
  } catch (err) {
    throw new ResponseError(response.status, response.statusText);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _fetch = async (baseUrl: string): Promise<ResponseType> => {
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
