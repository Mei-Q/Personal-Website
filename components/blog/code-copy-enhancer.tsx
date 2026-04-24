"use client";

import { useEffect } from "react";

export function CodeCopyEnhancer() {
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>(".prose pre"));
    const buttons: HTMLButtonElement[] = [];

    for (const block of blocks) {
      const parent = block.parentElement;
      if (!parent || parent.querySelector(".code-copy-button")) continue;

      parent.style.position = "relative";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-button";
      button.textContent = "复制";
      button.addEventListener("click", async () => {
        const code = block.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "已复制";
        } catch {
          button.textContent = "复制失败";
        }
        window.setTimeout(() => {
          button.textContent = "复制";
        }, 1500);
      });

      parent.appendChild(button);
      buttons.push(button);
    }

    return () => {
      for (const button of buttons) button.remove();
    };
  }, []);

  return null;
}
