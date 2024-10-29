const ChatBubble = ({ hour, msg, status, isResponse, isLoading }) => {

  return (
    <div class="flex items-start gap-2.5">
      <div class={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200  ${isResponse || isLoading ? "rounded-l-xl bg-gray-200" : "rounded-r-xl bg-gray-100"} rounded-b-xl dark:bg-gray-700`}>
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{isResponse || isLoading ? "Max-bot" : "Usuário"}</span>
          {!isLoading && <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{hour}</span>}
        </div>
        {isLoading && <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white animate-bounce">...</p>}
        {!isLoading && <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg}</p>}
        {!isLoading && <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{status}</span>}
      </div>
    </div>

  )
}

export default ChatBubble