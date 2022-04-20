import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StateType } from "../store";

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;