ALTER TABLE `budgets` MODIFY COLUMN `amount` decimal NOT NULL;--> statement-breakpoint
ALTER TABLE `expenses` MODIFY COLUMN `amount` decimal NOT NULL;--> statement-breakpoint
ALTER TABLE `expenses` MODIFY COLUMN `budget_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `expenses` ADD `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE `expenses` DROP COLUMN `created_by`;