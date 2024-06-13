CREATE TABLE `budgets` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`amount` varchar(255) NOT NULL,
	`icon` CHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`created_by` varchar(255) NOT NULL,
	CONSTRAINT `budgets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`amount` varchar(255) NOT NULL,
	`budget_id` int NOT NULL,
	`created_by` varchar(255) NOT NULL,
	CONSTRAINT `expenses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_budget_id_budgets_id_fk` FOREIGN KEY (`budget_id`) REFERENCES `budgets`(`id`) ON DELETE cascade ON UPDATE no action;