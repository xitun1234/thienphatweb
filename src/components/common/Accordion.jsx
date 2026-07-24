import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);
  const contentRefs = useRef({});

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border-t border-[#322d2a] last:border-b"
          >
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              className="flex items-center justify-between py-[20px] cursor-pointer group"
            >
              <h3 className="text-[16px] md:text-[18px] font-normal pr-[16px]">
                {item.title}
              </h3>
              <span className="flex-shrink-0 w-[32px] h-[32px] rounded-full border border-[#322d2a] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#322d2a] group-hover:text-white">
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </div>
            <div
              ref={(el) => {
                contentRefs.current[item.id] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isOpen
                  ? contentRefs.current[item.id]?.scrollHeight + "px"
                  : "0px",
              }}
            >
              <p className="text-[15px] leading-relaxed pb-[20px] text-[#555]">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
