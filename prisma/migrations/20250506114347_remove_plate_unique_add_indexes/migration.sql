-- DropIndex
DROP INDEX "Vehicle_plate_key";

-- CreateIndex
CREATE INDEX "Vehicle_plate_idx" ON "Vehicle"("plate");

-- CreateIndex
CREATE INDEX "Vehicle_isActive_idx" ON "Vehicle"("isActive");

-- CreateIndex
CREATE INDEX "Vehicle_exitTime_idx" ON "Vehicle"("exitTime");
