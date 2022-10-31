import { useEffect, useState } from "react";
import "./preview.scss";

import {
  githubStatsParser,
  htmlFormatter,
  styleTagScoper,
} from "../../common/utils";
import { fetchGithubData, GitHubData, GitHubDataFetcher } from "../../fetchers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";

interface Props {
  xhtml: string;
  username: string;
  onMaximized: () => void;
  onMinimized: () => void;
  className?: string;
  onFetch?: (GitHubData: GitHubData) => void;
}

export function Preview(props: Props) {
  const [githubData, setGithubData] = useState<GitHubData>(
    new GitHubDataFetcher().data,
  );
  const [maximized, setMaximized] = useState(false);
  const username = props.username;
  const onFetch = props.onFetch;
  useEffect(() => {
    if (username) {
      fetchGithubData({ username: username }).then((data) => {
        setGithubData(data);
        if (onFetch) {
          onFetch(data);
        }
      });
    }
  }, [username, onFetch]);

  return (
    <div className={`preview ${props.className}`}>
      <div className=" relative flex min-h-[28px] h-7 w-full px-1 items-center justify-between">
        <h2 className="absolute left-1/2 -translate-x-1/2 select-none ">
          {" "}
          Preview{" "}
        </h2>
        <div
          className="absolute left-[97%] -translate-x-full clickable"
          onClick={() => {
            if (maximized) {
              props.onMinimized();
            } else {
              props.onMaximized();
            }
            setMaximized(!maximized);
          }}
        >
          <FontAwesomeIcon
            className="text-white"
            icon={maximized ? faWindowMinimize : faWindowMaximize}
          ></FontAwesomeIcon>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="viewBox">
        <foreignObject
          className="xhtmlContainer"
          width="100%"
          height="100%"
          dangerouslySetInnerHTML={{
            __html: createNSDiv(props.xhtml, githubData),
          }}
        ></foreignObject>
      </svg>
    </div>
  );
}

function createNSDiv(xhtml: string, githubData: GitHubData): string {
  let preFormattedCode = "";
  try {
    preFormattedCode = htmlFormatter(xhtml);
  } catch (e) {
    const error = e as Error;
    return `
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        .error-view {
          width: 100%;
          height: 94vh;
          overflow: hidden;
          background: transparent;
          resize: none;
          outline: none;
          caret-color: transparent;
          padding: 4px;
        }
      </style>
      <textarea class="error-view" readonly>${error.message}</textarea>
    </div>`;
  }
  const parsedXhtml = githubStatsParser(preFormattedCode, githubData);
  const { scope, scopedXhtml } = styleTagScoper(parsedXhtml);
  return `
    <div xmlns="http://www.w3.org/1999/xhtml" class="${scope}">
      ${htmlFormatter(scopedXhtml)}
    </div>`;
}