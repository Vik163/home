import { StatusContext } from "@/shared/context/StatusContext";
import { StatusState } from "@/shared/types/topics";
import { ReactNode, useMemo, useState } from "react";

interface StatusProviderProps {
  children: ReactNode;
}

// создаем провайдер
const StatusProvider = (props: StatusProviderProps) => {
  const { children } = props;

  const [statusHome, setStatusHome] = useState<StatusState>("offline");
  const [statusMain, setStatusMain] = useState<StatusState>("offline");

  // используем useMemo, чтобы при рендере не создавать новый а возвращать старый объект
  // если из массива зависимостей ничего не изменилось
  const defaultProps = useMemo(
    () => ({
      statusHome,
      setStatusHome,
      statusMain,
      setStatusMain,
    }),
    [statusHome, statusMain]
  );

  return (
    <StatusContext.Provider value={defaultProps}>
      {children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
