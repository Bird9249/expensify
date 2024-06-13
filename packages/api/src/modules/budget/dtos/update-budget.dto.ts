import { InferOutput, omit } from "valibot";
import { CreateBudgetDto } from "./create-budget.dto";

export const UpdateBudgetDto = omit(CreateBudgetDto, ["createdBy"]);

export type UpdateBudgetDtoType = InferOutput<typeof UpdateBudgetDto>;
