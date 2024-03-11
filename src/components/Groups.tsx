import React, { useEffect, useMemo, useState } from "react";
import Group from "./Group";
import Filters from "./Filters";

interface GetGroupsResponse {
    result: 1 | 0;
    data?: GroupInterface[];
}

export interface GroupInterface {
    id: number;
    name: string;
    closed: boolean;
    avatar_color?: string;
    members_count: number;
    friends?: User[];
}

interface User {
    first_name: string;
    last_name: string;
}

export type SortingParams = {
    privacy: string;
    color: string;
    friends: string;
};

let groupsData: GroupInterface[] = [
    {
        id: 1,
        name: "Котики",
        closed: false,
        avatar_color: "red",
        members_count: 457,
        friends: [
            {
                first_name: "Маша",
                last_name: "Петрова",
            },
            {
                first_name: "Фёдор",
                last_name: "Агапов",
            },
            {
                first_name: "Вера",
                last_name: "Петрова",
            },
        ],
    },
    {
        id: 2,
        name: "Собачки",
        closed: false,
        avatar_color: "green",
        members_count: 147,
    },
    {
        id: 3,
        name: "Бабочки",
        closed: true,
        avatar_color: "yellow",
        members_count: 2,
        friends: [
            {
                first_name: "Василий",
                last_name: "Гончаров",
            },
        ],
    },
    {
        id: 4,
        name: "Утята",
        closed: false,
        avatar_color: "blue",
        members_count: 88,
        friends: [
            {
                first_name: "Маша",
                last_name: "Пивоварова",
            },
            {
                first_name: "Илья",
                last_name: "Кот",
            },
        ],
    },
    {
        id: 5,
        name: "Мишки",
        closed: true,
        avatar_color: "red",
        members_count: 4,
    },
    {
        id: 6,
        name: "Улитки",
        closed: true,
        members_count: 99,
        friends: [
            {
                first_name: "Маша",
                last_name: "Петрова",
            },
        ],
    },
    {
        id: 7,
        name: "Выдры",
        closed: false,
        avatar_color: "purple",
        members_count: 5,
        friends: [
            {
                first_name: "Ирина",
                last_name: "Харитонова",
            },
            {
                first_name: "Владислав",
                last_name: "Самсонов",
            },
            {
                first_name: "Сергей",
                last_name: "Антонов",
            },
        ],
    },
    {
        id: 8,
        name: "Зайки",
        closed: false,
        avatar_color: "white",
        members_count: 777,
    },
    {
        id: 9,
        name: "Кролики",
        closed: true,
        avatar_color: "yellow",
        members_count: 8,
        friends: [
            {
                first_name: "Даша",
                last_name: "Елец",
            },
        ],
    },
    {
        id: 10,
        name: "Утконосы",
        closed: true,
        members_count: 0,
    },
    {
        id: 11,
        name: "Куропатки",
        closed: false,
        avatar_color: "red",
        members_count: 33,
        friends: [
            {
                first_name: "Зоя",
                last_name: "Петрова",
            },
            {
                first_name: "Марфа",
                last_name: "Зайцева",
            },
        ],
    },
    {
        id: 12,
        name: "Козлики",
        closed: false,
        members_count: 7,
        friends: [
            {
                first_name: "Катя",
                last_name: "Самсонова",
            },
        ],
    },
    {
        id: 13,
        name: "Тигры",
        closed: false,
        avatar_color: "orange",
        members_count: 11,
        friends: [
            {
                first_name: "Лев",
                last_name: "Лещенко",
            },
            {
                first_name: "Фёдор",
                last_name: "Бондарчук",
            },
            {
                first_name: "Вера",
                last_name: "Брежнева",
            },
        ],
    },
    {
        id: 14,
        name: "Птички",
        closed: true,
        avatar_color: "blue",
        members_count: 23,
    },
];

const Groups: React.FC = () => {
    let [groups, setGroups] = useState<GroupInterface[]>([]);
    let [filteredGroups, setFilteredGroups] = useState<GroupInterface[]>(groups);
    let [sortingParams, setSortingParams] = useState<SortingParams>({
        privacy: "all",
        color: "any",
        friends: "any",
    });
    let [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setFilteredGroups(
            groups
                .filter((elem) => {
                    if (sortingParams.privacy === "all") return elem;
                    if (sortingParams.privacy === "closed" && elem.closed) return elem;
                    if (sortingParams.privacy === "opened" && !elem.closed) return elem;
                })
                .filter((elem) => {
                    if (sortingParams.color === "any") return elem;
                    if (sortingParams.color === elem.avatar_color) return elem;
                })
                .filter((elem) => {
                    if (sortingParams.friends === "any") return elem;
                    if (sortingParams.friends === "haveFriends" && elem.friends?.length) return elem;
                    if (sortingParams.friends === "noFriends" && !elem.friends?.length) return elem;
                })
        );
    }, [sortingParams, groups]);

    let uniqColors = useMemo(() => {
        let colors: string[] = [];

        groupsData.forEach((elem) => {
            if (elem.avatar_color && !colors.includes(elem.avatar_color)) {
                colors.push(elem.avatar_color);
            }
        });

        return colors;
    }, [groups]);

    function getGroupsResponse() {
        setIsFetching(true);
        setGroups([]);

        new Promise<GroupInterface[]>((resolve, reject) => {
            setTimeout(() => {
                setIsFetching(false);

                if (Math.random() > 0.3) {
                    resolve(groupsData);
                } else {
                    reject(new Error("Error"));
                }
            }, 1000);
        })
            .then((res) => {
                setGroups(res);
                setFilteredGroups(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="groups">
            <div className="groups_header">
                <button disabled={isFetching ? true : false} className="groups_header_fetch" onClick={() => getGroupsResponse()}>
                    Запросить группы
                </button>
                <Filters uniqColors={uniqColors} setSortingParams={setSortingParams} />
            </div>
            <div className="groups_content">
                {filteredGroups.map((elem) => {
                    return <Group group={elem} />;
                })}
            </div>
        </div>
    );
};

export default Groups;
