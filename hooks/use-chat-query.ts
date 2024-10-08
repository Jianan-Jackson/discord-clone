import qs from "query-string";

import { useInfiniteQuery} from "@tanstack/react-query";

import { useSocket} from "@/components/providers/socket-provider";

interface ChatQueryProps {
    apiUrl: string;
    queryKey: string
    paramKey: "channelId" | "conversationId";
    paramValue: string;
};


export const useChatQuery = ({
    apiUrl,
    queryKey,
    paramKey,
    paramValue,
}: ChatQueryProps) => {
    const {isConnected} = useSocket();

    const fetchMessages = async ({pageParam = undefined}) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue,
            },
        }, {skipNull: true});

        const res = await fetch(url);

        return res.json();
    };


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? 1000 : false,
        initialPageParam: undefined,
    })


    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    };

}


