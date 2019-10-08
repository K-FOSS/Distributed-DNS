// Web/UI/Components/Providers/NavProvider.tsx
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useLocation } from 'react-router';
import { useRoute } from '../Router/useRoute';

interface Context {
  navOpen: boolean;
  toggleNav: () => void;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
}

const NavContext = createContext<Context>({
  navOpen: false,
  toggleNav: () => {},
  setNavOpen: () => {},
});

export function NavProvider({
  children,
}: PropsWithChildren<{}>): React.ReactElement {
  const route = useRoute();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState<boolean>(false);

  const toggleNav = useCallback(() => setNavOpen((navOpen) => !navOpen), [
    setNavOpen,
  ]);

  useEffect(() => setNavOpen(() => false), [location.pathname]);

  const Children = useMemo(() => route?.hideUI ? <></> : <>{children}</>, [route?.hideUI, children])

  return (
    <NavContext.Provider value={{ navOpen, setNavOpen, toggleNav }}>
      {Children}
    </NavContext.Provider>
  );
}

export function useNavState(): Context {
  return useContext(NavContext);
}
