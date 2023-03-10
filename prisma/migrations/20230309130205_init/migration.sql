-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name_surname" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "sex" INTEGER NOT NULL,
    "dep" TEXT NOT NULL,
    "num_of_econ" INTEGER NOT NULL,
    "diff" INTEGER NOT NULL,
    "sure" INTEGER NOT NULL,
    "gps_risk_willingness" INTEGER NOT NULL,
    "gps_future_benefit" INTEGER NOT NULL,
    "gps_punish_self" INTEGER NOT NULL,
    "gps_punish_other" INTEGER NOT NULL,
    "gps_d1" INTEGER NOT NULL,
    "gps_d2" INTEGER NOT NULL,
    "gps_d3" INTEGER NOT NULL,
    "gps_d4" INTEGER NOT NULL,
    "gps_d5" INTEGER NOT NULL,
    "gps_stair_risk" INTEGER NOT NULL,
    "gps_gift" INTEGER NOT NULL,
    "gps_donation" INTEGER NOT NULL,
    "gps_stair_patience" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "decision_time" INTEGER,
    "chosen_probability" DOUBLE PRECISION,
    "is_blue" BOOLEAN NOT NULL,
    "first_draw_blue" BOOLEAN,
    "second_draw_blue" BOOLEAN,
    "third_draw_blue" BOOLEAN,
    "fourth_draw_blue" BOOLEAN,
    "fifth_draw_blue" BOOLEAN,
    "sixth_draw_blue" BOOLEAN,
    "reward" INTEGER NOT NULL,
    "participantId" TEXT NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "location" TEXT,
    "num_of_blue_a" INTEGER NOT NULL,
    "num_of_blue_b" INTEGER NOT NULL,
    "treatment" TEXT NOT NULL,
    "drawn_balls" INTEGER[],

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_id_key" ON "Participant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Round_id_key" ON "Round"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
