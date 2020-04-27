<?php

namespace App\Controller;

use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route(path="/api/projects")
 */
class ProjectController extends AbstractController
{
    /**
     * @Route("/list", name="api_projects_list")
     */
    public function list(ProjectRepository $projectRepository, Request $request): JsonResponse
    {
        $projects = $projectRepository->findAll();
        return $this->json($projects);
    }
}
