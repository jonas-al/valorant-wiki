const ChatBubble = ({ hour, msg, status, response }) => {

  return (
    <div class="flex items-start gap-2.5">
      <div class={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200  ${response ? "rounded-l-xl bg-gray-200" : "rounded-r-xl bg-gray-100"} rounded-b-xl dark:bg-gray-700`}>
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{response ? "Max-bot" : "Usuário"}</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{hour}</span>
        </div>
        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg}</p>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{status}</span>
      </div>
    </div>

  )
}

export default ChatBubble