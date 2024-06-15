/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef } from "react";
import { Suggestion } from "../../types";

type SearchSuggestionProps = {
  suggestions: Suggestion[];
  highLighText: string;
  onSelect: (productId: string) => void;
  selectedSuggestion: number;
};

const SearchSuggestion = forwardRef<HTMLDivElement, SearchSuggestionProps>(
  (
    {
      onSelect,
      highLighText,
      suggestions,
      selectedSuggestion,
    }: SearchSuggestionProps,
    ref
  ) => {
    const getHighLightedText = (text: string): JSX.Element => {
      const parts = text.split(new RegExp(`(${highLighText})`, "gi"));
      return (
        <span>
          {parts.map((part, index) => {
            return part.toLowerCase() === highLighText.toLowerCase() ? (
              <b key={index} className="text-orange-500">
                {part}
              </b>
            ) : (
              part
            );
          })}
        </span>
      );
    };

    return (
      <div
        className="bg-white shadow-md w-full absolute top-10 z-10 max-h-[200px] overflow-auto customScrollBar"
        ref={ref}
      >
        <ul className="flex flex-col overflow-auto hide-scrollbar w-full ">
          {suggestions &&
            suggestions.length > 0 &&
            suggestions.map((suggestion, index) => {
              return (
                <li
                  key={index}
                  className={`text-base text h-9 cursor-pointer px-3 text-black ${
                    selectedSuggestion === index ? "bg-gray-200" : ""
                  }`}
                  onClick={() => onSelect(suggestion.productId)}
                >
                  {getHighLightedText(suggestion.item_name)}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
);

export default SearchSuggestion;
