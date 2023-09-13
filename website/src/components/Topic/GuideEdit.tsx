import { createShortcut } from "@solid-primitives/keyboard"
import { For, Show, createEffect, onMount } from "solid-js"
import { useGlobalTopic } from "../../GlobalContext/global-topic"
import { useEditGuide } from "../../GlobalContext/edit-guide"
import { signedIn } from "../../../lib/auth"
import { useMobius } from "../../root"


export default function GuideSummaryEdit() {
  const topic = useGlobalTopic()
  const editedGuide = useEditGuide()
  const mobius = useMobius()

  // TODO: avoid this as there is same onMount in [topic]/index.tsx
  // there should be only one
  // if you go from /index to /edit, get the data from global store
  // don't do repeat server requests for data already there
  onMount(async () => {
    if (signedIn()) {
      const globalTopic = await mobius.query({
        getGlobalTopic: {
          where: {
            // TODO: get topic name from route
            topicName: "3d-printing",
          },
          select: {
            prettyName: true,
            topicSummary: true,
          },
        },
      })
      console.log(globalTopic, "global topic (signed in)")
      if (globalTopic !== null) {
        // @ts-ignore
        editedGuide.set(globalTopic.data.getGlobalTopic)
      }
    } else {
      // TODO: check that user is signed in admin of topic
      // in future allow all users to edit guides, for now just admins
      // if not, navigate back to <topic>
      // await mobius.
      // if (!admin) { navigate() }
    }
  })


  createEffect(() => {
    const editableDiv = document.getElementById("GuideSummary")!

    editableDiv.addEventListener("click", () => {
      editableDiv.setAttribute("contenteditable", "true")
      editableDiv.focus()
    })
    createShortcut(["ENTER"], () => {
      let summary = document.getElementById("GuideSummary")!.innerHTML
      console.log(summary, "summary")
    })
  })

  createEffect(() => {
    topic.globalTopic.globalGuide.sections.map((section, index) => {
      console.log(`${section.title}${index}`, "WAT")
      const editableDiv = document.getElementById(`${section.title}${index}`)!

      editableDiv.addEventListener("click", () => {
        editableDiv.setAttribute("contenteditable", "true")
        editableDiv.focus()
      })
      createShortcut(["ENTER"], () => {
        let sectionTitle = document.getElementById(
          `${section.title}${index}`,
        )!.innerHTML
        console.log(sectionTitle, "section title")
        console.log(`${section.title}${index}`, "section title id")
      })
    })
  })

  return (
    <>
      <style>{`
    #GuideSummaryExpanded {
      height: 100%;
    }
    #GuideSummaryMinimised {
      height: 97px
    }
  `}</style>
      <div class="w-full flex flex-col gap-4 text-[16px] leading-[18.78px]">
        <div class="flex justify-between items-center ">
          <div
            class="border-[#696969] border p-[8px] px-[10px] rounded-[4px] text-[#696969] font-light hover:bg-gray-300 hover:bg-opacity-50 cursor-pointer transition-all"
            onClick={() => { }}
          >
            Cancel
          </div>
          <div class="bg-[#3B5CCC] text-white border-[#3B5CCC] border px-[10px] p-[8px] rounded-[4px] font-light cursor-pointer">
            Submit Changes
          </div>
        </div>
        <div
          // id={showSummary() ? "GuideSummaryExpanded" : "GuideSummaryMinimised"}
          class="bg-[#FAFAFA] flex flex-col gap-2 rounded-[2px] p-4 w-full"
        >
          <div class="flex justify-between items-center">
            <div class="text-[#696969] ">Summary</div>
            <div
              class="text-[#3B5CCC] cursor-pointer select-none"
              onClick={() => {
                // setShowSummary(!showSummary())
              }}
            >
              {/* <Show when={true} fallback={<div>Expand</div>}>
                Minimise
              </Show> */}
            </div>
          </div>
          <Show
            when={topic.globalTopic.globalGuide.summary.length > 0}
            fallback={
              <div
                class="text-[#696969] font-light overflow-hidden text-ellipsis outline-none"
                id="GuideSummary"
                onClick={() => {
                  // setEditSummary(true)
                }}
              // contentEditable={editSummary()}
              >
                Add summary
              </div>
            }
          >
            <div
              class="text-[#696969] font-light overflow-hidden text-ellipsis outline-none"
              id="GuideSummary"
              onClick={() => {
                // setEditSummary(true)
              }}
            // contentEditable={editSummary()}
            >
              {topic.globalTopic.globalGuide.summary}
            </div>
          </Show>
        </div>
        <div
          class="bg-[#3B5CCC] text-white p-3 rounded-[4px] flex justify-center items-center cursor-pointer hover:bg-[#3554b9] transition-all"
          onClick={() => {
            topic.addSection({
              order: 0,
              title: "hello",
              ordered: true,
              links: [],
            })
            console.log(topic.globalTopic.globalGuide.sections, "sections")
          }}
        >
          Add section
        </div>
        <For each={topic.globalTopic.globalGuide.sections}>
          {(section, index) => {
            return (
              <div class="border border-slate-400 border-opacity-30 rounded-lg flex flex-col gap-4 p-4">
                <Show
                  when={section.title.length > 0}
                  fallback={
                    <div
                      class="text-[#696969] font-light overflow-hidden text-ellipsis outline-none"
                      id={`${section.title}${index()}`}
                      onClick={() => { }}
                    >
                      Add section title
                    </div>
                  }
                >
                  <div
                    class="text-[#696969] font-light overflow-hidden text-ellipsis outline-none"
                    id={`${section.title}${index()}`}
                    onClick={() => { }}
                  >
                    {section.title}
                  </div>
                </Show>
                <div class="flex flex-col">
                  <For each={section.links}>
                    {(link) => {
                      return (
                        <div class="flex items-center gap-6 justify-between border-b border-slate-400 border-opacity-30 p-2">
                          <div class="w-full  h-full flex justify-between items-center">
                            <div class="w-fit gap-1 flex flex-col">
                              <div class="font-bold text-[#3B5CCC]">
                                <input
                                  class="border border-slate-400 border-opacity-30 rounded-[6px] px-2 py-1"
                                  type="text"
                                  placeholder="Title"
                                  value={link.title}
                                />
                              </div>
                              <div class="flex w-full">
                                {/* <Show when={link?.type}>
                              <div class="font-light text-[12px] text-[#696969] border-r border-[#CCCCCC] px-2">
                                {link?.type}
                              </div>
                            </Show> */}
                                <Show when={link?.year}>
                                  <div class="font-light text-[12px] text-[#696969] border-r border-[#CCCCCC] px-2">
                                    {link?.year}
                                  </div>
                                </Show>
                                <Show when={link?.author}>
                                  <div class="font-light text-[12px] text-[#696969] border-r border-[#CCCCCC] px-2">
                                    {link?.author}
                                  </div>
                                </Show>
                                {/* <Show when={link?.time}>
                              <div class="font-light text-[12px] text-[#696969] border-r border-[#CCCCCC] px-2">
                                {link?.time}
                              </div>
                            </Show> */}
                                <div class="font-light w-full text-[12px] text-[#696969]">
                                  <input
                                    class="border border-slate-400 border-opacity-30 rounded-[6px] px-2 py-1 w-full"
                                    type="text"
                                    placeholder="URL"
                                    value={link.title}
                                  />
                                </div>
                              </div>
                              {/* <div class="font-light text-[12px] text-[#696969]">PDF</div> */}
                            </div>
                            <div class="flex gap-5 text-[14px] opacity-50">
                              <div>Sort</div>
                              <div>Delete</div>
                            </div>
                          </div>
                        </div>
                      )
                    }}
                  </For>
                </div>
                <div class="w-full justify-end flex">
                  <div
                    class="bg-[#3B5CCC] text-white text-[14px] p-2 px-4 rounded-[6px] flex justify-center items-center cursor-pointer hover:bg-[#3554b9] transition-all"
                    onClick={() => {
                      topic.addLinkToSection(0, {
                        title: "",
                        url: "",
                      })
                      console.log(section.links, "links")
                    }}
                  >
                    Add link
                  </div>
                </div>
              </div>
            )
          }}
        </For>
      </div>
    </>
  )
}
