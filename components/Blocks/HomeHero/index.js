import { useEffect, useMemo, useState } from "react";
import { getVimeoEmbedUrl } from "utils/getVimeoEmbedUrl";

export const HomeHero = ({ data, style }) => {
  const vimeoEmbedUrl = getVimeoEmbedUrl(data.vimeo_url || data.vimeoUrl);
  const words = useMemo(
    () =>
      data.words
        ? data.words
            .split(/<br\s*\/?>|\r?\n/i)
            .map((word) => word.trim())
            .filter(Boolean)
        : [],
    [data.words],
  );
  const wordsDelay = Number(
    data.words_delay ||
      data.wordsDelay ||
      data.words_interval ||
      data.wordsInterval ||
      2500,
  );
  const wordsDelayMs = Number.isFinite(wordsDelay)
    ? wordsDelay < 100
      ? wordsDelay * 1000
      : wordsDelay
    : 2500;
  const wordsTransitionMs = 600;
  const marqueeWords = words.length > 1 ? [...words, words[0]] : words;
  const [activeWord, setActiveWord] = useState(0);
  const [isResettingWords, setIsResettingWords] = useState(false);

  useEffect(() => {
    setActiveWord(0);
    setIsResettingWords(false);
  }, [words]);

  useEffect(() => {
    if (words.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setIsResettingWords(false);
      setActiveWord((currentWord) => currentWord + 1);
    }, wordsDelayMs);

    return () => clearInterval(interval);
  }, [words.length, wordsDelayMs]);

  useEffect(() => {
    if (activeWord !== words.length || words.length <= 1) {
      return;
    }

    const resetTimeout = setTimeout(() => {
      setIsResettingWords(true);
      setActiveWord(0);
    }, wordsTransitionMs);

    return () => clearTimeout(resetTimeout);
  }, [activeWord, words.length]);

  return (
    <div className={`home-hero`}>
      <div className="container">
        <h1>
          <span>{data.line_1}</span>
          <span>{data.line_2}</span>
          <span>{data.line_3}</span>
          <span
            className={`home-hero__words${isResettingWords ? " is-resetting" : ""}`}
            style={{
              "--word-index": activeWord,
              "--word-transition-duration": `${wordsTransitionMs}ms`,
            }}
          >
            <span className="home-hero__words-track">
              {marqueeWords.map((word, index) => (
                <div className="home-hero__word" key={`${word}-${index}`}>
                  {word}.
                </div>
              ))}
            </span>
          </span>
        </h1>
      </div>
      {vimeoEmbedUrl && (
        <div className="home-hero__video">
          <iframe
            src={vimeoEmbedUrl}
            title="Home hero video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
