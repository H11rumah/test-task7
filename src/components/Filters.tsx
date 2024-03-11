import React, { useEffect, useState } from "react";
import { SortingParams } from "./Groups";

type FiltersProps = {
    uniqColors: string[];
    setSortingParams: React.Dispatch<React.SetStateAction<SortingParams>>;
};

const Filters: React.FC<FiltersProps> = ({ uniqColors, setSortingParams }) => {
    let [privacy, setPrivacy] = useState<string>("all");
    let [color, setColor] = useState<string>("any");
    let [friends, setFriends] = useState<string>("any");

    useEffect(() => {
        setSortingParams({
            privacy: privacy,
            color: color,
            friends: friends,
        });
    }, [privacy, color, friends]);

    return (
        <div className="groups_header_filters">
            <label htmlFor="privacy">Тип приватности</label>
            <select
                id="privacy"
                onChange={(event) => {
                    setPrivacy(event.target.value);
                }}
            >
                <option value="all">Все</option>
                <option value="closed">Закрытые</option>
                <option value="opened">Открытые</option>
            </select>
            <label htmlFor="color">Цвет аватарки</label>
            <select
                id="color"
                onChange={(event) => {
                    setColor(event.target.value);
                }}
            >
                <option value="any">Любой</option>
                {uniqColors.map((elem) => {
                    return <option value={elem}>{elem}</option>;
                })}
            </select>
            <label htmlFor="friends">Наличие друзей</label>
            <select
                id="friends"
                onChange={(event) => {
                    setFriends(event.target.value);
                }}
            >
                <option value="any">Любые</option>
                <option value="haveFriends">Есть друзья</option>
                <option value="noFriends">Нет друзей</option>
            </select>
        </div>
    );
};

export default Filters;
