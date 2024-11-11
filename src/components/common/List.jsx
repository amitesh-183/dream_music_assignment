import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const List = ({ track, onPlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: track.musicId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onPlay}
      className={`flex items-center gap-4 md:px-20 px-4 py-2 w-full cursor-pointer
        ${
          track.active
            ? "bg-[#520000] border-l-[7px] border-red-700"
            : "border-l-[7px] border-transparent"
        }
      `}
    >
      <b className="w-[4%]">{track.musicId}</b>
      <div className="flex items-center md:w-[46%] w-[78%] gap-4">
        <img src={track.imageUrl} alt={track.title} className="w-10 h-10" />
        <h4>{track.title}</h4>
      </div>
      <div className="w-[20%] md:block hidden">{track.plays}</div>
      <div className="w-[5%]">{track.duration}</div>
      <div className="w-[25%] md:flex justify-end hidden">{track.album}</div>
    </div>
  );
};

export default List;
