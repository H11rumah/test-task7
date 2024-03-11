import React, { useState } from "react";
import { GroupInterface } from "./Groups";

type GroupProps = {
    group: GroupInterface;
};

const Group: React.FC<GroupProps> = ({ group }) => {
    let [isFriendsOpen, setIsFriendsOpen] = useState(false);

    return (
        <div className="groups_content_group">
            {group.avatar_color ? <div className="groups_content_group_avatar" style={{ backgroundColor: group.avatar_color }}></div> : <></>}
            <div className="groups_content_group_info">
                <div className="groups_content_group_name">Название: {group.name}</div>
                <div className="groups_content_group_privacy">Приватность: {group.closed ? "закрытая" : "открытая"}</div>
                <div className="groups_content_group_subs">Подписчиков: {group.members_count}</div>
                {group.friends ? (
                    <div className="groups_content_group_friends" onClick={() => setIsFriendsOpen((prev) => !prev)}>
                        {isFriendsOpen
                            ? group.friends.map((elem) => {
                                  return (
                                      <span>
                                          {elem.first_name} {elem.last_name}
                                      </span>
                                  );
                              })
                            : `Друзей: ${group.friends.length}`}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Group;
