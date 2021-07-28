using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AirBnbWebApi.Migrations
{
    public partial class m9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Beds",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NoOfKingbeds = table.Column<int>(type: "int", nullable: true),
                    NoOfSinglebeds = table.Column<int>(type: "int", nullable: true),
                    NoOfDoublebeds = table.Column<int>(type: "int", nullable: true),
                    PropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beds", x => x.id);
                    table.ForeignKey(
                        name: "FK_Beds_properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "properties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Guests",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NoOfAdultGuests = table.Column<int>(type: "int", nullable: false),
                    NoOfChildGuests = table.Column<int>(type: "int", nullable: false),
                    PropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guests", x => x.id);
                    table.ForeignKey(
                        name: "FK_Guests_properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "properties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Images = table.Column<byte>(type: "tinyint", nullable: false),
                    PropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Photos_properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "properties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });



            migrationBuilder.CreateIndex(
                name: "IX_Beds_PropertyId",
                table: "Beds",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Guests_PropertyId",
                table: "Guests",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_PropertyId",
                table: "Photos",
                column: "PropertyId");
        }
           
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Beds");

            migrationBuilder.DropTable(
                name: "Guests");

            migrationBuilder.DropTable(
                name: "Photos");

           
        }
    }
}
