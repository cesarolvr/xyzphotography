"use client";

import classNames from "classnames";
import { useState } from "react";

// Data
import { featuredItems } from "@/data";

// Components
import Description from "../Description";
import Image from "next/image";

// Fonts
import { helvetica } from "@/fonts";

// Styles
import {
  CarouselStyled,
  CarouselItem,
  CarouselItemLayer,
  CarouselItemContent,
  CarouselControl,
  NextThumbnail,
  PrevThumbnail,
  FeaturedItem,
  ImageWrapper,
  Overlay,
  Title,
  TitleOutline,
} from "./styles";

const Carousel = (): React.ReactNode => {
  const [activeItem, setActiveItem]: Array<number | Function> = useState(0);

  const goNext = (current: number): null => {
    if (current === featuredItems.length - 1) {
      setActiveItem(0);
      return null;
    }
    setActiveItem(current + 1);

    return null;
  };

  const goPrev = (current: number): null => {
    if (current === 0) {
      setActiveItem(featuredItems.length - 1);
      return null;
    }
    setActiveItem(current - 1);

    return null;
  };

  return (
    <CarouselStyled>
      {featuredItems.map(
        (
          { title, id, featuredImage, backgroundImage, author, when, link },
          index
        ) => {
          const isFirstItem = index === 0;
          const isLastItem = index === featuredItems.length - 1;

          const previewOfPrev =
            featuredItems[isFirstItem ? featuredItems.length - 1 : index - 1]
              .featuredImage;

          const previewOfNext =
            featuredItems[isLastItem ? 0 : index + 1].featuredImage;

          return (
            <CarouselItem
              key={`${index}-${id}`}
              $backgroundImage={backgroundImage}
              className={classNames({
                "-active": index === activeItem,
              })}
            >
              <CarouselItemLayer />
              <CarouselItemContent>
                <PrevThumbnail onClick={() => goPrev(index)}>
                  <Image src={previewOfPrev} alt="" />
                </PrevThumbnail>
                <FeaturedItem>
                  <ImageWrapper>
                    <Overlay>
                      <Title>{title}</Title>
                      <CarouselControl>
                        <p className={helvetica.className}>
                          {(activeItem + 1).toString()} of{" "}
                          {featuredItems.length}
                        </p>
                        <div className="dots">
                          {featuredItems.map((_, index) => {
                            return (
                              <div
                                onClick={() => setActiveItem(index)}
                                key={index}
                                className={classNames("dot", {
                                  "-active": activeItem === index,
                                })}
                              />
                            );
                          })}
                        </div>
                      </CarouselControl>
                    </Overlay>
                    <Image src={featuredImage} alt="" />
                    <TitleOutline>{title}</TitleOutline>
                  </ImageWrapper>
                </FeaturedItem>
                <NextThumbnail onClick={() => goNext(index)}>
                  <Image src={previewOfNext} alt="" />
                </NextThumbnail>
              </CarouselItemContent>
              <Description author={author} when={when} link={link} />
            </CarouselItem>
          );
        }
      )}
    </CarouselStyled>
  );
};

export default Carousel;
