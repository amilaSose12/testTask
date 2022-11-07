<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class MistralBeController extends AbstractController
{
    #[Route('/users_overview', name: 'users_overview')]
    public function index(): Response
    {
        return $this->render('mistral_be/index.html.twig', [
            'controller_name' => 'MistralBeController',
        ]);
    }
}
