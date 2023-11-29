import styles from "@/app/ui/home/home.module.css";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBarLineContainer}
        style={{ width: `${progress}%` }}
      >
        <span className={styles.progressBarLine}></span>
      </div>
    </div>
  );
}
