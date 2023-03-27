import { MigrationInterface, QueryRunner } from "typeorm";

export class createArticles1679917492008 implements MigrationInterface {
    name = 'createArticles1679917492008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "tagList" text NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "favoritesCount" integer NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
