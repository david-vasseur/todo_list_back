-- DropIndex
DROP INDEX `Family_ownerId_fkey` ON `family`;

-- DropIndex
DROP INDEX `Task_treeId_fkey` ON `task`;

-- DropIndex
DROP INDEX `Tree_familyId_fkey` ON `tree`;

-- DropIndex
DROP INDEX `User_familyId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `family` ADD COLUMN `type` ENUM('Famille', 'TEAM') NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_familyId_fkey` FOREIGN KEY (`familyId`) REFERENCES `Family`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Family` ADD CONSTRAINT `Family_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tree` ADD CONSTRAINT `Tree_familyId_fkey` FOREIGN KEY (`familyId`) REFERENCES `Family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_treeId_fkey` FOREIGN KEY (`treeId`) REFERENCES `Tree`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserTrees` ADD CONSTRAINT `_UserTrees_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tree`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserTrees` ADD CONSTRAINT `_UserTrees_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
