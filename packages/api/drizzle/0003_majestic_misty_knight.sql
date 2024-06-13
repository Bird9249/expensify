ALTER TABLE `budgets` MODIFY COLUMN `amount` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `expenses` MODIFY COLUMN `amount` decimal(10,2) DEFAULT '0';