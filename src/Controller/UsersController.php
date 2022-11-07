<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Users;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\UsersService;
use App\Service\PermissionsService;

use Symfony\Component\HttpFoundation\Request;




class UsersController extends AbstractController
{

    

    #[Route('/users', name: 'app_users')]
    public function index(): Response
    {
        return $this->render('users/index.html.twig', [
            'controller_name' => 'UsersController',
        ]);
    }

    #[Route('/getUsersList/{page}', methods: ['GET'], name: 'get_user_list_api')]
    public function getUsersList(int $page = 1, ManagerRegistry $doctrine, UsersService $usersService) : Response
    {
        $users = $usersService->getAllUsers($page, $doctrine);
        
        return new Response($users);
    }

    #[Route('/getUser/{userId}', methods: ['GET'], name: 'get_user_api')]
    public function getUserById(int $userId = null, ManagerRegistry $doctrine, UsersService $usersService) : Response
    {
        $users = $usersService->getUserById($userId, $doctrine);
        
        return new Response($users);
    }

    #[Route('/updateUser', methods: ['POST'], name: 'update_user_api')]
    public function updateUserApi(Request $request, ManagerRegistry $doctrine, UsersService $usersService) : Response
    {
        $parameters = $request->getContent();
        $parameters = json_decode($parameters, true);

        $user = $usersService->updateUserData($parameters, $doctrine);
        
        return new Response($user);
    }

    #[Route('/createNewUser', methods: ['POST'], name: 'create_new_user_api')]
    public function createNewUser(Request $request, ManagerRegistry $doctrine, UsersService $usersService) : Response
    {
        $parameters = $request->getContent();
        $parameters = json_decode($parameters, true);

        $user = $usersService->createNewUser($parameters, $doctrine);
        
        return new Response($user);
    }

    #[Route('/deleteUser/{userId}', methods: ['DELETE'], name: 'delete_user_api')]
    public function deleteUserAction(int $userId = null, ManagerRegistry $doctrine, UsersService $usersService) : Response
    {
        $users = $usersService->deleteUserAction($userId, $doctrine);
        
        return new Response($users);
    }

    #[Route('/getFilteredUsers/{filterWord}/{status}/{page}', methods: ['GET'], name: 'get_filtered_users_api')]
    public function getFilteredUsers(string $filterWord = '', string $status = '', int $page = 1, Request $request, ManagerRegistry $doctrine, UsersService $usersService) : Response
    {
        $users = $usersService->getFilteredUsers($filterWord, $status, $page, $doctrine);
        
        return new Response($users);
    }

    #[Route('/getAllPermissionsForUsers', methods: ['GET'], name: 'get_all_permissions_for_users_api')]
    public function getAllPermissionsForUsers(ManagerRegistry $doctrine, PermissionsService $permissionsService) : Response
    {
        $permissions = $permissionsService->getAllPermissionsForUsers($doctrine);
        
        return new Response($permissions);
    }

   
    #[Route('/changePermissionForUser', methods: ['POST'], name: 'change_permission_for_user_api')]
    public function changePermissionForUser(Request $request, ManagerRegistry $doctrine, UsersService $usersService) : Response
    {
        $parameters = $request->getContent();
        $parameters = json_decode($parameters, true);

        $user = $usersService->changePermissionForUser($parameters, $doctrine);
        
        return new Response($user);
    }

}
