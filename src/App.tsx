import React from 'react';
import { useMemo, useState, useRef, useEffect } from 'react';

import { Ship } from './components/common/Ship';
import { SputnikOrb } from './components/common/SputnikOrb';
import { EarthImg } from './components/images/EarthImg';
import { AppButton } from './components/buttons/AppButton';

import { State } from './types/State';
import { useWindowResize } from './hooks/useWindowResize';
import { useDynamicRefs } from './hooks/useDynamicRefs';
import { windowResizeHandler } from './utils/windowResizeHandler';
import { sputnikModelBuilder } from './utils/sputnikModelBuilder';
import { checkCollision } from './utils/checkCollision';

import s from "./style.module.sass"
import "src/assets/sass/_common.sass";
import { shipModelBuilder } from './utils/shipModelBuilder';


export const App: React.FC = () => {
  const { width } = useWindowResize(windowResizeHandler);
  const [sputnikModels, setModels] = useState(() => sputnikModelBuilder(3));
  const [shipSpeed] = useState(() => shipModelBuilder());
  const [state, setState] = useState<State>("ready");
  const shipRef = useRef<SVGSVGElement>(null);
  const [getRef, setRef, map] = useDynamicRefs<SVGSVGElement>();

  const isMobile = useMemo(() => {
    if (width < 992) {
      return true
    }
    return false;
  }, [width]);

  const isProcess = useMemo(() => {
    if (state === "process") {
      return true;
    }
    return false;
  }, [state]);

  const goToProcess = () => {
    setState("process");
  }

  const goToFinish = () => {
    setState("finish");
    alert("Вы победили");
    setModels(sputnikModelBuilder(3));
    setState("ready");
  }

  const goToError = () => {
    setState("error");
    alert("Вы проиграли");
    setModels(sputnikModelBuilder(3));
    setState("ready");
  }

  useEffect(() => {
    let animationRequestId = 0;

    const handler = () => {
      if (state !== "process") {
        cancelAnimationFrame(animationRequestId)
        return;
      }

      sputnikModels.forEach((model) => {
        const sputnikRef = getRef(model.id, map)

        if (sputnikRef?.current && shipRef.current) {
          if (checkCollision(shipRef.current, sputnikRef.current)) {
            cancelAnimationFrame(animationRequestId);
            goToError();
            return;
          }
        }
      });
      animationRequestId = requestAnimationFrame(handler);
    }
    animationRequestId = requestAnimationFrame(handler);

    return () => {
      cancelAnimationFrame(animationRequestId);
    }
  }, [map, getRef, sputnikModels, state])

  return (
    <main className={ s.main }>
      <div className={ s.wrap }>
        <EarthImg />
        { sputnikModels.map((model) => 
          <SputnikOrb
            key={model.id}
            ref={setRef(model.id, map)}
            radius={isMobile ? model.radius / 2 : model.radius}
            speed={isProcess ? model.speed : 0}
            xOffset={isMobile ? model.xOffset / 2 : model.xOffset}
            yOffset={isMobile ? model.yOffset / 2 : model.yOffset}
            rotate={model.rotate}
            isClockwise={model.isClockwise}
          />
        )}
        <Ship ref={shipRef} speed={isProcess ? shipSpeed : 0} onFinish={goToFinish} />
      </div>
      { state === "ready" &&
        <div className={ s.button }>
          <AppButton onClick={goToProcess}>Запуск</AppButton>
        </div>
      }
    </main>
  );
};
