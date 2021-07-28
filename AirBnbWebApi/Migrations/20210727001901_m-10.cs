using Microsoft.EntityFrameworkCore.Migrations;

namespace AirBnbWebApi.Migrations
{
    public partial class m10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Images",
                table: "Photos");

            migrationBuilder.AddColumn<string>(
                name: "ImageName",
                table: "Photos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageName",
                table: "Photos");

            migrationBuilder.AddColumn<byte>(
                name: "Images",
                table: "Photos",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }
    }
}
