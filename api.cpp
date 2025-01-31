#include <iostream>
#include <string>
#include <vector>
#include "crow_all.h"

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/api/projects")
    ([](){
        crow::json::wvalue projects;
        projects[0]["title"] = "Proyek 1";
        projects[0]["description"] = "Deskripsi Proyek 1.";
        projects[0]["url"] = "#";
        projects[1]["title"] = "Proyek 2";
        projects[1]["description"] = "Deskripsi Proyek 2.";
        projects[1]["url"] = "#";
        return projects;
    });

    app.port(8080).multithreaded().run();
}