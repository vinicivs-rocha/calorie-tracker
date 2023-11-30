"use client";

import styles from "@/app/ui/home/home.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "current";
  
  const navigationContainer = useRef<HTMLUListElement>(null);
  const navigationTabs = useRef<HTMLLIElement[]>([]);
  const activeTabIndicator = useRef<HTMLDivElement>(null);

  const createQueryString = useCallback((tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);

    return params.toString();
  }, [searchParams])

  function navigateTo(tab: string) {
    const queryString = createQueryString(tab);
    router.push(`${pathname}?${queryString}`);
  }

  function calculateIndicatorLeft(tab: HTMLLIElement) {
    const tabLeft = tab.getBoundingClientRect().left;
    const containerLeft = navigationContainer.current!.getBoundingClientRect().left;
    return tabLeft - containerLeft;
  }

  function slideIndicatorToTab(tab: HTMLLIElement) {
    const indicatorLeft = calculateIndicatorLeft(tab);
    const tabWidth = tab.clientWidth;

    activeTabIndicator.current!.style.left = `${indicatorLeft}px`;
    activeTabIndicator.current!.style.width = `${tabWidth}px`;
  }

  function activateTab(tab: HTMLLIElement, tabName: string) {
    navigateTo(tabName);
    slideIndicatorToTab(tab);
  }

  useEffect(() => {
    const currentTabElement = navigationTabs.current[activeTab === "current" ? 0 : 1]
    slideIndicatorToTab(currentTabElement);
  }, [])
 
  return (
    <nav>
      <ul className={styles.navigationContainer} ref={navigationContainer}>
        <li
          className={clsx(
            {
              [styles.activeTab]: activeTab === "current",
            }
          )}
          onClick={({currentTarget}) => activateTab(currentTarget, "current")}
          ref={el => navigationTabs.current.push(el!)}
        >
          Atual
        </li>
        <li
          className={clsx({
            [styles.activeTab]: activeTab === "history",
          })}
          onClick={({currentTarget}) => activateTab(currentTarget, "history")}
          ref={el => navigationTabs.current.push(el!)}
        >
          Histórico
        </li>
        <div className={styles.activeTabIndicator} ref={activeTabIndicator}></div>
      </ul>
    </nav>
  );
}
