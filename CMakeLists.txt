cmake_minimum_required(VERSION 3.10)
project(Portfolio)

find_package(crow REQUIRED)

add_executable(api api.cpp)
target_link_libraries(api crow::crow)