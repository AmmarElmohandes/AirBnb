using Microsoft.EntityFrameworkCore.Migrations;

namespace AirBnbWebApi.Migrations
{
    public partial class addtablesBedsGuestsPhotos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Beds",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    NoOfKingbeds = table.Column<int>(type: "int", nullable: true),
                    NoOfSinglebeds = table.Column<int>(type: "int", nullable: true),
                    NoOfDoublebeds = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beds", x => x.id);
                    table.ForeignKey(
                        name: "FK_Beds_properties_id",
                        column: x => x.id,
                        principalTable: "properties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Guests",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    NoOfAdultGuests = table.Column<int>(type: "int", nullable: false),
                    NoOfChildGuests = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guests", x => x.id);
                    table.ForeignKey(
                        name: "FK_Guests_properties_id",
                        column: x => x.id,
                        principalTable: "properties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    Images = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Photos_properties_id",
                        column: x => x.id,
                        principalTable: "properties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });
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
