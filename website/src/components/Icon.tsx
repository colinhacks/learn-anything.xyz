import { Match, Show, Switch } from "solid-js"

interface Props {
  name:
    | "Bug"
    | "Close"
    | "Minimise"
    | "Plus"
    | "Learn"
    | "Checkmark"
    | "UserProfile"
  width?: string
  height?: string
  color?: string
  tooltip?: {
    content: string
    position: string
  }
}

export default function Icon(props: Props) {
  return (
    <>
      <style>{`
        #BottomLeft {
          top: 110%;
          left: -260%;
        }
        #BottomRight {
          top: 100%;
          left: 40%;
        }
        #TopLeft {
          top: -110%;
          left: -260%;
        }
        #TopRight {
          top: -100%;
          left: 40%;
        }
      `}</style>
      <div class="has-tooltip">
        <Show when={props.tooltip !== undefined}>
          <div
            id={props.tooltip?.position}
            class=" px-5 p-[1px] bg-zinc-100  dark:bg-neutral-950 rounded-full border  border-slate-400 border-opacity-50 tooltip"
          >
            {props.tooltip!.content}
          </div>
        </Show>
        <Switch>
          <Match when={props.name === "Learn"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.75 10L12 5.75L19.2501 10L12 14.25L4.75 10Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M12.5 10C12.5 10.2761 12.2761 10.5 12 10.5C11.7239 10.5 11.5 10.2761 11.5 10C11.5 9.72386 11.7239 9.5 12 9.5C12.2761 9.5 12.5 9.72386 12.5 10Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6.75 11.5V16.25C6.75 16.25 8 18.25 12 18.25C16 18.25 17.25 16.25 17.25 16.25V11.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </Match>
          <Match when={props.name === "UserProfile"}>
            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5 12C18.5 15.5899 15.5899 18.5 12 18.5V20C16.4183 20 20 16.4183 20 12H18.5ZM12 18.5C8.41015 18.5 5.5 15.5899 5.5 12H4C4 16.4183 7.58172 20 12 20V18.5ZM5.5 12C5.5 8.41015 8.41015 5.5 12 5.5V4C7.58172 4 4 7.58172 4 12H5.5ZM12 5.5C15.5899 5.5 18.5 8.41015 18.5 12H20C20 7.58172 16.4183 4 12 4V5.5Z"
                fill="currentColor"
              ></path>
              <path
                d="M13.5 10C13.5 10.8284 12.8284 11.5 12 11.5V13C13.6569 13 15 11.6569 15 10H13.5ZM12 11.5C11.1716 11.5 10.5 10.8284 10.5 10H9C9 11.6569 10.3431 13 12 13V11.5ZM10.5 10C10.5 9.17157 11.1716 8.5 12 8.5V7C10.3431 7 9 8.34315 9 10H10.5ZM12 8.5C12.8284 8.5 13.5 9.17157 13.5 10H15C15 8.34315 13.6569 7 12 7V8.5Z"
                fill="currentColor"
              ></path>
              <path
                d="M6.62148 16.5197C6.35622 16.8378 6.39908 17.3108 6.71721 17.576C7.03535 17.8413 7.50828 17.7984 7.77354 17.4803L6.62148 16.5197ZM16.2266 17.4803C16.4918 17.7984 16.9648 17.8413 17.2829 17.576C17.601 17.3108 17.6439 16.8378 17.3786 16.5197L16.2266 17.4803ZM7.77354 17.4803C8.78362 16.2689 10.3017 15.5 12.0001 15.5V14C9.83796 14 7.90434 14.9811 6.62148 16.5197L7.77354 17.4803ZM12.0001 15.5C13.6984 15.5 15.2165 16.2689 16.2266 17.4803L17.3786 16.5197C16.0958 14.9811 14.1622 14 12.0001 14V15.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </Match>
          <Match when={props.name === "Plus"}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 5.75V18.25"
              ></path>
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M18.25 12L5.75 12"
              ></path>
            </svg>
          </Match>
          <Match when={props.name === "Checkmark"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75 12.75L10 15.25L16.25 8.75"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </Match>
          <Match when={props.name === "Close"}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17.25 6.75L6.75 17.25"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6.75 6.75L17.25 17.25"
              />
            </svg>
          </Match>
          <Match when={props.name === "Bug"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75 13C7.75 10.6528 9.65279 8.75 12 8.75C14.3472 8.75 16.25 10.6528 16.25 13V15C16.25 17.3472 14.3472 19.25 12 19.25C9.65279 19.25 7.75 17.3472 7.75 15V13Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 9V19"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.75 6.38333C8.75 5.48127 9.48127 4.75 10.3833 4.75H13.6167C14.5187 4.75 15.25 5.48127 15.25 6.38333C15.25 7.41426 14.4143 8.25 13.3833 8.25H10.6167C9.58574 8.25 8.75 7.41426 8.75 6.38333Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 14.75L6.06651 15.2713C5.27613 15.5587 4.75 16.3098 4.75 17.1509V19.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 11L5.8018 9.81635C5.15398 9.46753 4.75 8.79118 4.75 8.05541V5.75"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.5 14.75L17.9335 15.2713C18.7239 15.5587 19.25 16.3098 19.25 17.1509V19.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 11L18.1982 9.81635C18.846 9.46753 19.25 8.79118 19.25 8.05541V5.75"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Match>
          <Match when={props.name === "Minimise"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.25 18.25V13.75H5.75"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.75 5.75V10.25H18.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.75 19.25L10.25 13.75"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.25 4.75L13.75 10.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Match>
        </Switch>
      </div>
    </>
  )
}
