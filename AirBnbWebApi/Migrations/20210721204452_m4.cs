using Microsoft.EntityFrameworkCore.Migrations;

namespace AirBnbWebApi.Migrations
{
    public partial class m4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "age",
                table: "hosts");

            migrationBuilder.RenameColumn(
                name: "gender",
                table: "hosts",
                newName: "Gender");

            migrationBuilder.RenameColumn(
                name: "BD",
                table: "hosts",
                newName: "BirthDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "hosts",
                newName: "gender");

            migrationBuilder.RenameColumn(
                name: "BirthDate",
                table: "hosts",
                newName: "BD");

            migrationBuilder.AddColumn<int>(
                name: "age",
                table: "hosts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
